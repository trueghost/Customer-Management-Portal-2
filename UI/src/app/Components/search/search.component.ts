import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/Services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {


  constructor(private service:SearchService,private router: Router) {}

  allProducts: any;
  isFetching: boolean = false;
  editMode: boolean = false; 
  countryDetails$!: Observable<any[]>;
  stateDetails$!: Observable<any[]>;
  stateDetails:any=[];
  countryDetails:any=[];

  countryDetailsMap:Map<number, string> = new Map()
  stateDetailsMap:Map<number, string> = new Map()
  model : any={}; 

  @ViewChild('accordionItem', {static: true}) accordionItem!: ElementRef;

  scrollToAccordionItem() {
    this.accordionItem.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  ngOnInit(): void{
    this.countryDetails$ = this.service.showCountry();
    this.stateDetails$ = this.service.showState();
    this.refreshcountryDetailsMap();
    this.refreshstateDetailsMap();
    this.showData();
  }

  tohome() {
    this.router.navigate(['home']);
    setTimeout(() => {
      location.reload();
    }, 1);
    }

    logout() {
      if(confirm(`Are you sure you want to logout ?`)){
      this.router.navigate(['/login']);
      this.router.resetConfig([
        {path: '', redirectTo: '/login', pathMatch: 'full'},
      ]);
    }
    }

 data() {
      this.router.navigate(['data']);
      setTimeout(() => {
        location.reload();
      }, 100);
      } 

search() {
this.router.navigate(['search']);
setTimeout(() => {
location.reload();
  }, 100);
  } 

showData(){
this.service.showdata().subscribe((products) => {  
  this.allProducts = products.map((item) => ({
    ...item,
    status: item.status === 2,
  }));
  this.isFetching = false;
});
  }

  onToggle(item:any){
    let body = {
      CustomerId: item.CustomerId,
      Status: item.status ? 1 : 2,
    }
    this.service.statusChange(body).subscribe();
  }


 searchdata() {
this.service.searchdata(this.model).subscribe((res: any) => {  
  this.allProducts=res;   
 console.log(this.allProducts);   
  })  
 }

 refreshcountryDetailsMap(){
  this.service.showCountry().subscribe(data =>{
    this.countryDetails = data;
    
    for(let i=0; i< data.length; i++)
    {
      this.countryDetailsMap.set(this.countryDetails[i].Id,this.countryDetails[i].
        CountryName);
    }
  })
}

refreshstateDetailsMap(){
  this.service.showState().subscribe(data =>{
    this.stateDetails = data;
    
    for(let i=0; i< data.length; i++)
    {
      this.stateDetailsMap.set(this.stateDetails[i].Id,this.stateDetails[i].
        StateName);
    }
  })
}

}
