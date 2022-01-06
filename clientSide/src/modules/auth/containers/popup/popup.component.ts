import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Permission, Role} from '@modules/auth/models';
import {UserService} from '@modules/auth/services';
import {RoleService} from '@modules/auth/services/roles.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
    selector: 'sb-popup', templateUrl: './popup.component.html', styleUrls: ['popup.component.scss'],
})
export class PopupComponent implements OnInit {
    password: string = '';
    email: string = '';
    hasError: any = false;
    value: string = '';
    permissions: Permission[] = [];
    roles: Role[] = [];
    @Output() created: EventEmitter<any> = new EventEmitter();
    @Input() type: string;
    @Input() userId: number;
    selectedValues: { name: string, selected: boolean, id: number }[];
    user: {
        firstname: string, lastname: string, email: string, password: string
    }={
        firstname:'',
        lastname:'',
        email:'',
        password:'',
    };

    constructor(public userService: UserService, public roleService: RoleService, public router: Router, private toast: HotToastService) {
    }

    getRoles() {
        this.roleService.getRoles().subscribe(value => {
            console.log(value);
            if (value && value.body) {
                this.roles = value.body
                this.selectedValues = [];
                for (const role of this.roles) {
                    this.selectedValues.push({
                        name: role.name, id: role.id, selected: false
                    })
                }
            }
        })
    }

    ngOnInit() {
        if (this.type == 'role') {
            this.getPermissions();
        }
        if (this.type == 'user') {
            this.getRoles();
        }
        if (this.type == 'user_view') { //were missing user api that returns user with it permissions not important right now
            this.getUser();
        }
    }

    passBack() {
        this.created.emit('');
    }

    userCreate() {
        if (this.user.firstname && this.user.lastname && this.user.email && this.user.password) {
            this.roleService.createUser(this.user.firstname, this.user.lastname, this.user.email, this.user.password).subscribe(value1 => {
                this.passBack()
            })
        }
    }

    getPermissions() {
        this.roleService.getPermissions().subscribe(value => {
            console.log(value);
            if (value && value.body) {
                this.permissions = value.body
                this.selectedValues = [];
                for (const permission of this.permissions) {
                    this.selectedValues.push({
                        name: permission.name, id: permission.id, selected: false
                    })
                }
            }
        })
    }

    save() {
        if (this.type == 'per') {
            this.roleService.savePermissions(this.value).subscribe(value => this.passBack())
        } else if (this.type == 'role') {
            let selected: string[] = [];

            for (const selectedPermissionElement of this.selectedValues) {
                if (selectedPermissionElement.selected) {
                    selected.push(selectedPermissionElement.name)
                }
            }

            // no selected permissions
            if (selected.length == 0) {
                console.log(selected);

                this.toast.error('Please select at least one permission', {
                    position: 'top-right',
                });
                return;
            }

            this.roleService.saveRole(this.value, selected).subscribe(value => {
                this.toast.success('Role created', {
                    position: 'top-right',
                });
                this.passBack();
            })
        } else if (this.type == 'user') {
            console.log(this.userId)
            let selected: number[] = [];
            for (const selectedPermissionElement of this.selectedValues) {
                if (selectedPermissionElement.selected) {
                    selected.push(selectedPermissionElement.id)
                }
            }
            for (const id of selected) {
                this.roleService.assignRoleUser(this.userId, id).subscribe(value => this.passBack())
            }
        } else {
            this.userCreate()
        }
        /*
        this.ngbModal.open()
        */
    }

    private getUser() {
        this.roleService.getUserById(this.userId).subscribe(value1 => {
            if (value1 && value1.body) {
            }
        })
    }
}
