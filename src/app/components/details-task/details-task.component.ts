import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.css']
})
export class DetailsTaskComponent implements OnInit {
  id:any | null;

  constructor(private aroute: ActivatedRoute) { 
   this.id = aroute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
  }

}
