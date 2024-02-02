export interface UserFullData {
  UserId: number;
  User_Name: string;
  Password: string;
  User_Role_Type_Id: number;
  First_Name: string;
  Last_Name: string;
  Email: string;
  Phon_Number: string;
  Profile_Picture: string;
  Bday: string | null;
  PeopleCreated: string;
  UserCreated: string;
  CustomerId: number | null;
  Customer_Rank_Name: string | null;
  CustomerCreated: string | null;
  Customer_Rank_Type: number | null;
  EmployeeId: number;
  EmployeeSalary: number | null;
  Days_Off: number | null;
  Sick_Days: number | null;
  JobStatus_Name_Type: number | null;
  EmployeeCreated: string;
  JobStatus_Name: string;
  OwnerId: number | null;
  OwnerSalary: number | null;
  OwnerCreated: string | null;
}
