import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {

  constructor(private service:DataService,private router: Router) {}

  @ViewChild('accordionItem', {static: true}) accordionItem!: ElementRef;
  @ViewChild('productsForm') form!: NgForm;
  @ViewChild('button') button!: ElementRef;

  scrollToAccordionItem() {
    this.accordionItem.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  allProducts: any;
  isFetching: boolean = false;
  editMode: boolean = false;
  currentID!: number; 
  countryDetails$!: Observable<any[]>;
  stateDetails$!: Observable<any[]>;
  stateDetails:any=[];
  countryDetails:any=[];

  countryList$!:Observable<any[]>;
  stateList$!:Observable<any[]>;

  countryDetailsMap:Map<number, string> = new Map()
  stateDetailsMap:Map<number, string> = new Map()

  @Input() customer:any;
  customerId: number=0;
  name: string= "";
  phNo: string= "";
  email: string= "";
  countryId!: number;
  stateId!: number;
  remarks: string= "";
  gstEnable = false;
  createdDate: string= "";
  status!: number;  

  ngOnInit(): void{
    this.countryList$ = this.service.showCountry();
    this.stateList$ = this.service.showState();
    this.countryDetails$ = this.service.showCountry();
    this.stateDetails$ = this.service.showState();
    this.refreshcountryDetailsMap();
    this.refreshstateDetailsMap();
    this.showData();
  }

  showData(){
    this.service.showDetails().subscribe((products) => {  
      this.allProducts = products.map((item) => ({
        ...item,
        status: item.status === 2,
      }));
      this.isFetching = false;
    });
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

 updateStates() {
if (this.countryId == 1) {
    this.stateId = 4;
} else if (this.countryId == 2) {
    this.stateId = 5;
  }
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

addDetails(data:any){
  if(!this.editMode){
  var details = {
  "Name" : this.name,
  "PhNo" : this.phNo,
  "Email" : this.email,
  "CountryId" : this.countryId,
  "StateId" : this.stateId,
  "Remarks" : this.remarks,
  "CreatedDate" : this.createdDate,
  "GSTEnable" : this.gstEnable ? 'Yes' : 'No'
}
this.service.addDetails(details).subscribe();
setTimeout(() => {
  location.reload();
}, 1000);}

else{
  var detailse = {
  "CustomerId" : this.currentID,
  "Name" : this.name,
  "PhNo" : this.phNo,
  "Email" : this.email,
  "CountryId" : this.countryId,
  "StateId" : this.stateId,
  "Remarks" : this.remarks,
  "CreatedDate" : this.createdDate,
  "GSTEnable" : this.gstEnable ? 'Yes' : 'No'
  }
  this.service.updateDetails(detailse);
  setTimeout(() => {
    location.reload();
  }, 1000);
}
 
}

onToggle(item:any){
  let body = {
    CustomerId: item.CustomerId,
    Status: item.status ? 1 : 2,
  }
  this.service.statusChange(body).subscribe();
}

updateCourse(CustomerId:number){
  this.currentID = CustomerId;
  let currentProduct = this.allProducts.find((p: { CustomerId: number; }) => { return p.CustomerId === CustomerId});

  this.form.setValue({
    Name: currentProduct.Name,
    PhNo : currentProduct.PhNo,
    Email : currentProduct.Email,
    CountryId : currentProduct.CountryId,
    StateId : currentProduct.StateId,
    Remarks : currentProduct.Remarks,
    CreatedDate : currentProduct.CreatedDate,
    GSTEnable : currentProduct.GSTEnable === 'Yes'
    
  });

  this.editMode = true;
  window.scrollTo(0, 0);
  this.button.nativeElement.scrollIntoView({ behavior: 'smooth' });
}

}
