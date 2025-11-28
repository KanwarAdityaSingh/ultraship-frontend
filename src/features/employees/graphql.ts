import { gql } from '@apollo/client'

export type EmployeeType = 'DRIVER' | 'DISPATCHER' | 'WAREHOUSE_STAFF' | 'ADMIN'
export type Department = 'OPERATIONS' | 'DISPATCH' | 'WAREHOUSE' | 'ADMINISTRATION'
export type EmploymentStatus = 'ACTIVE' | 'ON_LEAVE' | 'TERMINATED'

export type Employee = {
  id: string
  name: string
  age: number
  class: string
  subjects: string[]
  attendance: number
  employeeType: EmployeeType
  department: Department
  licenseNumber?: string | null
  licenseExpiry?: string | null
  certifications: string[]
  shiftSchedule?: string | null
  assignedRegion?: string | null
  vehicleAssigned?: string | null
  currentLocation?: string | null
  contactNumber: string
  emergencyContact?: string | null
  hireDate: string
  employmentStatus: EmploymentStatus
  performanceScore?: number | null
  onTimeDeliveryRate?: number | null
  isFlagged?: boolean | null
  flagReason?: string | null
  flaggedAt?: string | null
  flaggedBy?: string | null
  createdAt: string
  updatedAt: string
}

export const GET_EMPLOYEES = gql`
  query GetEmployees($first: Int, $skip: Int, $filter: EmployeeFilterInput, $sort: EmployeeSortInput) {
    employees(first: $first, skip: $skip, filter: $filter, sort: $sort) {
      edges {
        node {
          id
          name
          age
          class
          subjects
          attendance
          employeeType
          department
          licenseNumber
          certifications
          shiftSchedule
          assignedRegion
          vehicleAssigned
          currentLocation
          contactNumber
          hireDate
          employmentStatus
          performanceScore
          onTimeDeliveryRate
          isFlagged
          flagReason
          flaggedAt
          flaggedBy
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      name
      age
      class
      subjects
      attendance
      employeeType
      department
      licenseNumber
      licenseExpiry
      certifications
      shiftSchedule
      assignedRegion
      vehicleAssigned
      currentLocation
      contactNumber
      emergencyContact
      hireDate
      employmentStatus
      performanceScore
      onTimeDeliveryRate
      isFlagged
      flagReason
      flaggedAt
      flaggedBy
      createdAt
      updatedAt
    }
  }
`

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: CreateEmployeeInput!) {
    addEmployee(input: $input) {
      id
      name
      employeeType
      department
    }
  }
`

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
      performanceScore
      onTimeDeliveryRate
      currentLocation
      employmentStatus
    }
  }
`

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`

export const FLAG_EMPLOYEE = gql`
  mutation FlagEmployee($id: ID!, $reason: String!) {
    flagEmployee(id: $id, reason: $reason) {
      id
      isFlagged
      flagReason
      flaggedAt
      flaggedBy
    }
  }
`

export const UNFLAG_EMPLOYEE = gql`
  mutation UnflagEmployee($id: ID!) {
    unflagEmployee(id: $id) {
      id
      isFlagged
      flagReason
      flaggedAt
    }
  }
`


