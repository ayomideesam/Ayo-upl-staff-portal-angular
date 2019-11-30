import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
declare const $: any;

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  staffs: any = [];
  dataTableInstance: any;
  activeStaff = {
    fname: null,
    lname: null,
    phone: null,
    email: null,
    password: null
  };
  activeStaffId = null;

  constructor(private web: HttpService) { }

  ngOnInit() {
    this.getStaffList();
  }
  public initDataTable(id, target = null) {
    if (this.dataTableInstance) {
      this.dataTableInstance.destroy();
    }
    const buttons = ['pdf', 'print', 'excel', 'csv', 'copy'];
    setTimeout(() => {
      this.dataTableInstance = ($('#' + id)as any).DataTable({
        pagingType: 'full_numbers',
        dom: 'Blfrtip',
        keys: !0,
        buttons,
        order: [[1, 'asc']],
        language: {
          search: '_INPUT_',
          searchPlaceholder: 'Search...',
          paginate: {
            previous: '<i class=\'fas fa-angle-left\'>',
            next: '<i class=\'fas fa-angle-right\'>'
          }
        },
        select: {
          // style: 'multi'
        },
        columnDefs: [ {
          targets: 'no-sort',
          orderable: false,
        } ],
        lengthMenu: [
          [5, 10, 50, 100, 150, -1],
          [5, 10, 50, 100, 150, 'All']
        ],
        responsive: true,
      });
      // $('.dt-buttons .btn').removeClass('btn-secondary').addClass('btn-sm btn-primary');
      // Add event listener for opening and closing details
      $(`#${id} tbody`).on('click', 'td.details-control', () => {
        const tr = $(this).closest('tr');
        const row = this.dataTableInstance.row( tr );
        console.info('JHGFDFGHJKL; ', row.child.isShown());
        if (!row.child.isShown()) {
          // This row is already open - close it
          $('.dtr-details').addClass('table-bordered table-hover table-striped');
          tr.removeClass('shown');
        } else {
          // Open this row
          $('.dtr-details').addClass('table-bordered table-hover table-striped');
          tr.addClass('shown');
        }
      });
    }, 400);

  }

  getStaffList() {
    this.web.getStaffList().subscribe(
      staffData => {
    this.staffs = staffData;
    console.log(this.staffs);
    this.initDataTable('staffTable');
    });
  }
  createStaff() {
    console.log(this.activeStaff);
    this.web.createNewStaff(this.activeStaff).subscribe(
      res => {
        this.getStaffList();
        $('#darkModalForm').modal('hide');
        window.location.reload();
        console.log(res);
    }, error => {
        console.log(error);
    });
  }

  viewStaff(staff) {
    console.log(staff);
    this.activeStaff = staff;
    this.activeStaffId = staff.id;
  }

  toggleStaff(staff) {
   console.log(staff);
   this.web.toggleStaff(staff.id).subscribe(
     (res: any) => {
        staff.active = res.active;
       // this.getStaffList();
        console.log(res);
      }, error => {
        console.log(error);
      });
  }

  updateStaff() {
    console.log('active ', this.activeStaff);
    this.web.updateStaff(this.activeStaffId, this.activeStaff).subscribe(
      res => {
        this.getStaffList();
        // ($('#updateEditStaff') as any).modal('hide');
        $('#updateEditStaff').modal('hide');
        window.location.reload();
        console.log(res);
      }, error => {
        console.log(error);
      });
  }

  deleteStaff(staff) {
    console.log(staff);
    this.web.deleteStaff(staff.id).subscribe(
      res => {
        this.getStaffList();
        console.log(res);
      }, error => {
        console.log(error);
      });
  }

}
