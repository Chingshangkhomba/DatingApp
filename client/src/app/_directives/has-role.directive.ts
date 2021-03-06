import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  user: User;

  constructor(private viewContainRef: ViewContainerRef, 
      private templateRef: TemplateRef<any>, 
      private accountService: AccountService) {
        this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
          this.user = user;
        })
   }

  ngOnInit(): void {
    //clear view if no roles
    if(!this.user?.roles || this.user == null) {
      this.viewContainRef.clear();
      return;
    }

    if (this.user?.roles.some(r => this.appHasRole.includes(r))) {
      this.viewContainRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainRef.clear();
    }
  }

}
