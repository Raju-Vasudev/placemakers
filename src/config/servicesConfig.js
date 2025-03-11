import BusinessIcon from '@mui/icons-material/Business';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import BuildIcon from '@mui/icons-material/Build';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import SupportIcon from '@mui/icons-material/Support';
import SecurityIcon from '@mui/icons-material/Security';
import PestControlIcon from '@mui/icons-material/PestControl';
import ParkIcon from '@mui/icons-material/Park';

export const servicesConfig = {
  title: "Our Services",
  subtitle: "Comprehensive facility management solutions",
  serviceGroups: [
    {
      title: 'Management Teams',
      icon: BusinessIcon,
      description: 'Professional facility and property management services',
      items: [
        'Property Managers',
        'Facility Managers',
        'Asst. Facility Managers',
        'Facility & Admin Executives'
      ]
    },
    {
      title: 'Technical Services',
      icon: EngineeringIcon,
      description: 'Comprehensive technical maintenance and operations',
      subgroups: [
        {
          title: 'Electrical Teams',
          items: [
            'Shift Supervisors',
            'Electrical Supervisor',
            'Electrical Technicians',
            'MST',
            'Lift Technicians'
          ]
        },
        {
          title: 'Mechanical Teams',
          items: [
            'HVAC Technicians',
            'Plumbing Supervisors',
            'Plumbers'
          ]
        },
        {
          title: 'Technical Teams',
          items: [
            'BMS Operators',
            'Fire Technicians',
            'Carpenter',
            'Mason',
            'Painters'
          ]
        }
      ]
    },
    {
      title: 'Housekeeping & Soft Services',
      icon: CleaningServicesIcon,
      description: 'Complete cleaning and maintenance solutions',
      subgroups: [
        {
          title: 'Housekeeping Teams',
          items: [
            'Housekeeping Managers',
            'Housekeeping Executives',
            'Housekeeping Supervisors',
            'Housekeeping Staff'
          ]
        },
        {
          title: 'Pantry Services',
          items: [
            'Pantry Boys',
            'Office Boys'
          ]
        }
      ]
    },
    {
      title: 'Support & Help Desk',
      icon: SupportIcon,
      description: 'Dedicated support and assistance services',
      items: [
        'Help Desk Executives',
        'Support Staff',
        'Administrative Support'
      ]
    },
    {
      title: 'Security Services',
      icon: SecurityIcon,
      description: '24/7 security and surveillance solutions',
      items: [
        'Security Officers',
        'Security Supervisors',
        'Security Guards',
        'Lady Guards'
      ]
    },
    {
      title: 'Specialized Services',
      icon: BuildIcon,
      description: 'Specialized maintenance and enhancement services',
      subgroups: [
        {
          title: 'Pest Control',
          items: [
            'Rodent Control',
            'Pest Treatment',
            'Chemical Treatment',
            'Prevention Services'
          ]
        },
        {
          title: 'Landscaping',
          items: [
            'Garden Maintenance',
            'Plant Care',
            'Irrigation Services',
            'Landscape Design'
          ],
          description: ''
        }
      ]
    }
  ]
}; 