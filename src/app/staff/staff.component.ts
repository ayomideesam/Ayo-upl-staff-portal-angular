import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from './../http.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

declare const $: any;

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  // @ViewChild('', ) staffData: NgForm;
  @ViewChild('staffData', {static: false}) formValues;
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
  formError = 'This field is required';
  toggleButton = [
    {
    src: 'src/app/images/toggle-on-solid.svg'},
    {
    src: 'src/app/images/toggle-off-solid.svg'
    }];

  constructor(private web: HttpService, private toastr: ToastrService, private router: Router, private SpinnerService: NgxSpinnerService) {
    const token = sessionStorage.getItem('user_token');
    console.log('this is token', token);
    if(!token || token === '' ) {
      console.log('token is here');
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.getStaffList();
    this.resetForm();
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
          [5, 10, 20, 50, 100, 150, -1],
          [5, 10, 20, 50, 100, 150, 'All']
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
    }, () => {
        // this.getStaffList();
      } );
  }
  createStaff() {
    console.log(this.activeStaff);
    this.web.createNewStaff(this.activeStaff).subscribe(
      res => {
        this.getStaffList();
        $('.modal').modal('hide');
        this.toastr.success('New Staff Record Added Successfully', 'Staff Staff Details Create');
        this.formValues.resetForm();
        // window.location.reload();
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
   const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire ({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, toggle it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
      }).then((result) => {
      if (result.value) {
        this.web.toggleStaff(staff.id).subscribe(
          (res: any) => {
            staff.active = res.active;
            this.toastr.success('Staff Record Toggled Successfully', 'Staff Record Toggle');
            // this.getStaffList();
            console.log(res);
          }, error => {
            console.log(error);
          });
        // swalWithBootstrapButtons.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your Present Status Is Safe :)',
          'error'
        );
      }
    });
   }

  updateStaff() {
    console.log('active ', this.activeStaff);
    this.SpinnerService.show();
    this.web.updateStaff(this.activeStaffId, this.activeStaff).subscribe(
      res => {
        this.getStaffList();
        // ($('#updateEditStaff') as any).modal('hide');
        $('.modal').modal('hide');
        this.SpinnerService.hide();
        this.toastr.success('Staff Record Updated Successfully', 'Staff Details Update');
        // window.location.reload();
        console.log(res);
      }, error => {
        console.log(error);
      });
   }

  deleteStaff(staff) {
    console.log(staff);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete staff record!'
    }).then((result) => {
      if (result.value) {
        this.web.deleteStaff(staff.id).subscribe(
          res => {
            this.getStaffList();
            this.toastr.success('Staff Record Deleted Successfully', 'Staff Details Delete');
            console.log(res);
          }, error => {
            console.log(error);
          });
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    });
  }

  resetForm(form?: NgForm) {
    if (form != null) {
    form.reset();
    }
    this.activeStaff = {
      fname: null,
      lname: null,
      phone: null,
      email: null,
      password: null
    };
  }

}
