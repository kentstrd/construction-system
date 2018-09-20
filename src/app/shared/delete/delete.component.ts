import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../../employee/services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../project/project.service';

@Component({
  selector: 'app-shared-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Input()
  id: string;
  @Input()
  for: string;

  parentUrl: string;
  constructor(private employeeService: EmployeeService, private projectService: ProjectService) {}

  ngOnInit() {}

  onDelete() {
    this.for == 'employee'
      ? this.employeeService.deleteEmployee(this.id)
      : this.projectService.deleteProject(this.id);
  }
}
