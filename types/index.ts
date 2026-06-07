 export type Branch =
  | 'CSE' | 'IT' | 'ECE' | 'EEE'
  | 'Mech' | 'Civil' | 'Other'

export type CollegeTier = 'IIT/NIT' | 'Tier 2' | 'Tier 3'

export type StudentProfile = {
  name:           string
  branch:         Branch
  cgpa:           number
  collegeTier:    CollegeTier
  graduationYear: number
}

export type RoleSuggestion = {
  title:      string
  match:      number
  reasoning:  string
}

export type ResumeGap = {
  section:  string
  issue:    string
  fix:      string
}

export type ResumeAnalysis = {
  atsScore:  number
  roles:     RoleSuggestion[]
  gaps:      ResumeGap[]
  summary:   string
}
