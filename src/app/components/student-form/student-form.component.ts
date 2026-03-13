import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
    selector: 'app-student-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './student-form.component.html',
    styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {

    student: Student = { firstName: '', lastName: '', email: '' };
    isEditMode = false;
    studentId?: number;

    constructor(
        private studentService: StudentService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.studentId = +id;
            this.studentService.getById(this.studentId).subscribe({
                next: (data) => this.student = data,
                error: (err) => console.error('Failed to load student', err)
            });
        }
    }

    onSubmit(): void {
        if (this.isEditMode && this.studentId) {
            this.studentService.update(this.studentId, this.student).subscribe({
                next: () => this.router.navigate(['/']),
                error: (err) => console.error('Failed to update student', err)
            });
        } else {
            this.studentService.create(this.student).subscribe({
                next: () => this.router.navigate(['/']),
                error: (err) => console.error('Failed to create student', err)
            });
        }
    }

    cancel(): void {
        this.router.navigate(['/']);
    }
}
