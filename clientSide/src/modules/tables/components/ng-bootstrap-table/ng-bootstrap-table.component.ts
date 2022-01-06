import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import {SBSortableHeaderDirective, SortEvent} from '@modules/tables/directives';
import {Country} from '@modules/tables/models';
import {CountryService} from '@modules/tables/services';
import {Observable} from 'rxjs';
import {User} from "@testing/mocks";
import {UserService} from "@modules/auth/services";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'sb-ng-bootstrap-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './ng-bootstrap-table.component.html',
    styleUrls: ['ng-bootstrap-table.component.scss'],
})
export class NgBootstrapTableComponent implements OnInit {
    ngOnInit(): void {
    }




}
