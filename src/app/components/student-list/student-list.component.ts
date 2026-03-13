import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
    selector: 'app-student-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './student-list.component.html',
    styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

    students: Student[] = [];

    constructor(private studentService: StudentService) { }

    ngOnInit(): void {
        this.loadStudents();
    }

    loadStudents(): void {
        this.studentService.getAll().subscribe({
            next: (data) => this.students = data,
            error: (err) => console.error('Failed to load students', err)
        });
    }

    deleteStudent(id: number): void {
        if (confirm('Are you sure you want to delete this student?')) {
            this.studentService.delete(id).subscribe({
                next: () => this.loadStudents(),
                error: (err) => console.error('Failed to delete student', err)
            });
        }
    }
}
