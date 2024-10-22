import { Component, OnInit } from '@angular/core';
import { RegionService } from '../../core/services/region.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [NgFor],
  templateUrl: './console.component.html',
  styleUrl: './console.component.css'
})
export default class ConsoleComponent implements OnInit {

  list:any[]=[]

  constructor(private regionService: RegionService) {

  }
  ngOnInit(): void {
    this.regionService.doOnGetAllRegion().subscribe((data: any) => {
      console.log(data)
      this.list = data;
    })
  }

}
