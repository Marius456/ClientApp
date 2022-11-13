import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User, Role } from './../../entities/user';
import { UserService } from './../../services/user.service';
type GUID = string & { isGuid: true};

@Component({
  selector: 'admin-users',
  templateUrl: './ShowUsers.component.html',
  styleUrls: ['./ShowUsers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowUsersComponent implements OnInit{
   Data:User[];   
  showModal: boolean;
  FromUser: FormGroup;
  submitted = false;
  selectedUserId: GUID;
   
   constructor(
    private formBuilder: FormBuilder,
    private UserService:UserService
   ) { 
   }    
   
   ngOnInit(): void {  
       this.GetUser();  
       
    this.FromUser = this.formBuilder.group({
      Role: ['']
  });
   }
 
   show(userId: GUID)
   {
     this.selectedUserId = userId;
     this.showModal = true;
   }
   
   hide()
   {
     this.showModal = false;
   }

   get f() { return this.FromUser.controls; }

   GetUser()    
   {  
      this.UserService.getUsers().subscribe(users => this.Data = users);    
   } 

   ChangeUserRole(role: Role) {
    this.submitted = true;

    this.UserService.updateRole(this.selectedUserId, role).subscribe(() => { this.GetUser();});  
    
    if(this.submitted)
    {
      this.showModal = false;
    }
 }
 
   DeleteUser(UserId: string) {  
     if (confirm("Are you sure to delete this user?")) {  
         this.UserService.deleteUser(UserId).subscribe(  
             () => {  
                 this.GetUser();  
             });  
     }     
   }  
}
