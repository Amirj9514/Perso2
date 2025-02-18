import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-applicants',
  standalone: true,
  imports: [TableModule,TagModule],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.scss'
})
export class ApplicantsComponent {
  ngOnInit(): void {
    
  }
  applicants = [
    { name: "John Doe", position: "Software Engineer", appliedDate: "2025-02-10", status: "Pending", contactInfo: "johndoe@example.com", code: "A1B2", image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Jane Smith", position: "UI/UX Designer", appliedDate: "2025-02-12", status: "Interview Scheduled", contactInfo: "janesmith@example.com", code: "X7Y3", image: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "Mark Johnson", position: "Frontend Developer", appliedDate: "2025-02-08", status: "Rejected", contactInfo: "markjohnson@example.com", code: "P9Q4", image: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "Alice Brown", position: "Backend Developer", appliedDate: "2025-02-14", status: "Accepted", contactInfo: "alicebrown@example.com", code: "Z5K8", image: "https://randomuser.me/api/portraits/women/4.jpg" },
    { name: "Robert Wilson", position: "Software Engineer", appliedDate: "2025-02-07", status: "Pending", contactInfo: "robertwilson@example.com", code: "M3N6", image: "https://randomuser.me/api/portraits/men/5.jpg" },
    { name: "Emily Davis", position: "Data Analyst", appliedDate: "2025-02-11", status: "Interview Scheduled", contactInfo: "emilydavis@example.com", code: "C8L2", image: "https://randomuser.me/api/portraits/women/6.jpg" },
    { name: "Michael Miller", position: "Machine Learning Engineer", appliedDate: "2025-02-13", status: "Pending", contactInfo: "michaelmiller@example.com", code: "V4T9", image: "https://randomuser.me/api/portraits/men/7.jpg" },
    { name: "Sarah Wilson", position: "Product Designer", appliedDate: "2025-02-05", status: "Rejected", contactInfo: "sarahwilson@example.com", code: "D6F7", image: "https://randomuser.me/api/portraits/women/8.jpg" },
    { name: "David Anderson", position: "DevOps Engineer", appliedDate: "2025-02-09", status: "Accepted", contactInfo: "davidanderson@example.com", code: "J2K5", image: "https://randomuser.me/api/portraits/men/9.jpg" },
    { name: "Sophia Moore", position: "Software Engineer", appliedDate: "2025-02-15", status: "Pending", contactInfo: "sophiamoore@example.com", code: "H9Y1", image: "https://randomuser.me/api/portraits/women/10.jpg" },
    { name: "Daniel Clark", position: "UI/UX Designer", appliedDate: "2025-02-06", status: "Rejected", contactInfo: "danielclark@example.com", code: "T5X8", image: "https://randomuser.me/api/portraits/men/11.jpg" },
    { name: "Olivia Rodriguez", position: "Frontend Developer", appliedDate: "2025-02-03", status: "Accepted", contactInfo: "oliviarodriguez@example.com", code: "Q1Z7", image: "https://randomuser.me/api/portraits/women/12.jpg" },
    { name: "James Lewis", position: "Backend Developer", appliedDate: "2025-02-02", status: "Pending", contactInfo: "jameslewis@example.com", code: "B4N6", image: "https://randomuser.me/api/portraits/men/13.jpg" },
    { name: "Isabella Walker", position: "Data Scientist", appliedDate: "2025-02-04", status: "Interview Scheduled", contactInfo: "isabellawalker@example.com", code: "X3C9", image: "https://randomuser.me/api/portraits/women/14.jpg" },
    { name: "Ethan Hall", position: "Mobile App Developer", appliedDate: "2025-02-01", status: "Pending", contactInfo: "ethanhall@example.com", code: "G2J5", image: "https://randomuser.me/api/portraits/men/15.jpg" },
    { name: "Charlotte Allen", position: "Cybersecurity Analyst", appliedDate: "2025-02-10", status: "Rejected", contactInfo: "charlotteallen@example.com", code: "W7T3", image: "https://randomuser.me/api/portraits/women/16.jpg" },
    { name: "Benjamin Young", position: "Full Stack Developer", appliedDate: "2025-02-13", status: "Accepted", contactInfo: "benjaminyoung@example.com", code: "F8L4", image: "https://randomuser.me/api/portraits/men/17.jpg" },
    { name: "Amelia King", position: "Software Engineer", appliedDate: "2025-02-14", status: "Pending", contactInfo: "ameliaking@example.com", code: "K5M9", image: "https://randomuser.me/api/portraits/women/18.jpg" },
    { name: "Lucas Scott", position: "Cloud Engineer", appliedDate: "2025-02-09", status: "Interview Scheduled", contactInfo: "lucasscott@example.com", code: "N2D7", image: "https://randomuser.me/api/portraits/men/19.jpg" },
    { name: "Mia Harris", position: "Game Developer", appliedDate: "2025-02-12", status: "Pending", contactInfo: "miaharris@example.com", code: "Y1V8", image: "https://randomuser.me/api/portraits/women/20.jpg" }
  ];

  getSeverity(position: string): "info" | "warn" | "danger" | "success" | "secondary" {
    switch (position) {
      case "Frontend Developer":
        return "info";
      case "Backend Developer":
        return "danger";
      case "Software Engineer":
        return "success";
        case "UI/UX Designer":
        return "secondary";
      default:
        return "warn";
    }
  }

  deleteApplicant(applicant: any) {
    const confirmDelete = confirm(`Are you sure you want to delete ${applicant.name}?`);
    if (confirmDelete) {
      this.applicants = this.applicants.filter(a => a !== applicant);
    }
  }
}