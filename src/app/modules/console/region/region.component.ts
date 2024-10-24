import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {RegionService} from '../services/region.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Errors} from '../../../core/models/errors.model';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Region} from '../models/region.model';
import {catchError, combineLatest, tap, throwError} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NgIf} from '@angular/common';

interface RegionForm {
  id: FormControl<string>;
  name: FormControl<string>;
  code: FormControl<string>
}

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLinkActive, RouterLink, NgIf],
  templateUrl: './region.component.html',
  styleUrl: './region.component.css'
})
export default class RegionComponent implements OnInit {
  operation: string = 'Create';
  spinners: boolean = false;
  regionForm: FormGroup<RegionForm>;
  errors: Errors = {errors: {}}
  regions: Region[] = []
  destroyRef = inject(DestroyRef);

  constructor(
    private regionService: RegionService,
  ) {
    this.regionForm = new FormGroup<RegionForm>(<RegionForm>{
      id: new FormControl('', {
        nonNullable: true
      }),
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: false
      }),
      code: new FormControl('', {
        validators: [Validators.required],
        nonNullable: false
      }),
    })
  }

  ngOnInit(): void {
    this.doOnGetAllRegion();
    this.regionService.currentListRegion.subscribe(region => {
      this.regions = region;
    })
  }

  doOnGetAllRegion(): void {
    combineLatest([
      this.regionService.doOnGetAllRegion()
    ]).pipe(tap(() => this.spinners = true))
      .pipe(catchError((err) => {
        return throwError(() => err);
      }))
      .subscribe(([regions]) => {
        console.log(regions);
        this.regions = regions;
        this.regionService.updateRegions(regions);
        this.spinners = false;
      })


  }

  doOnDeleteRegionById(id: string): void {
    console.log(id)
    if (!id) {
      return
    }
    this.regionService.doOnDeleteRegion(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({
        next: (value) => {
          console.log(value);
          const updatedRegions = this.regions.map(r => r.id === value.id ? value : r);
          this.regionService.updateRegions(updatedRegions)
        },

        error: (errors) => {
          this.errors = errors;
          this.spinners = false;
        }
      }))
  }

  doOnSaveRegion(): void {
    this.errors = {errors: {}};
    if (this.regionForm.invalid) {
      return
    }

    let observable =
      this.operation == 'Create' ? this.regionService.doOnSaveRegion(this.regionForm.value)
        : this.regionService.doOnUpdateRegion(this.regionForm.value);

    observable.pipe(tap(() => this.spinners = true))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => {
          const currentRegions = this.regionService.getRegions();

          if (this.operation == 'Create') {
            console.log("operation ", this.operation)
            this.regionService.updateRegions([...currentRegions, value])
          }
          if (this.operation == 'Update') {
            console.log("operation ", this.operation)
            const updatedRegions = this.regions.map(r => r.id === value.id ? value : r);
            this.regionService.updateRegions(updatedRegions)
          }

          this.spinners = false;
          this.resetForms();
        },
        error: (errors) => {
          this.errors = errors;
          this.spinners = false;
        }
      });
  }

  updateRegion(region: Region): void {
    this.operation = 'Update';
    this.regionForm.setValue({
      id: region.id,
      name: region.name,
      code: region.code
    })
  }

  resetForms(): void {
    this.operation = 'Create';
    this.regionForm.reset();

    Object.keys(this.regionForm.controls).forEach(c => {
      const control = this.regionForm.get(c);
      if (control) {
        console.log(control);
        control.markAsUntouched();
        control.markAsPristine()
      }
    })
  }
}
