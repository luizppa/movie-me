import { Component, OnInit } from '@angular/core'

import { Router } from '@angular/router'

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  public query: string

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public onKeydown(event){
    if (event.key === "Enter") {
      this.search()
    }
  }

  public search(){
    if(this.query.length){
      this.router.navigate(['search', '1'], { queryParams: {search: this.query}})
    }
  }

}
