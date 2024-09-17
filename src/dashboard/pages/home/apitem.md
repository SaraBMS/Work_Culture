import React from 'react';
import './teammates.css';
import teammates from '../../../assets/images/teammates 1.svg';
import refreshButton from '../../../assets/images/refreshButton.svg';
import arrowButton from '../../../assets/images/arrowButton.svg';
import MedalOne from '../../../assets/images/first_1.svg';
import Avatar from '../../../assets/images/Avatar.svg';
import { useImage } from '../../../hook/EmailProvider';
import Avatar2 from '../../../assets/images/Avatar 2.svg';
import Avatar3 from '../../../assets/images/Avatar 3.svg';
import MedalTwo from '../../../assets/images/first_2.svg';
import MedalThree from '../../../assets/images/first- 3.svg';

const TeamMates = () => {
    const { image } = useImage();

    const team_mates = [
        { profile: Avatar, label: 'Obada Rudainy', agency: 'DevSyro', agency_color: "#fff", percentage: 75, color: '#05CD99', background: '#05CD991A' },
        { profile: Avatar2, label: 'Leen Deeb', agency: 'Product Syro', agency_color: "#23C1FF", percentage: 55, color: '#EE5D50', background: "#EE5D501A" },
        { profile: Avatar3, label: 'Mohammed Hassan', agency: 'ArtSyro', agency_color: "#A744FF", percentage: 50, color: '#FFEB37', background: '#FFEB371A' },
        { profile: Avatar, label: 'Obada Rudainy', agency: 'DevSyro', agency_color: "#fff", percentage: 15, color: '#05CD99', background: '#05CD991A' },
        { profile: Avatar2, label: 'Leen Deeb', agency: 'Product Syro', agency_color: "#23C1FF", percentage: 5, color: '#EE5D50', background: '#EE5D501A' }
    ];

    

    // Fetch data from the API on component mount
     const [teamMates, setTeamMates] = useState([]);
    <!-- useEffect(() => {
        const fetchTeamMates = async () => {
            try {
                const response = await axios.get('/api/teamMates');  // Replace with your actual API endpoint
                setTeamMates(response.data);  // Assuming the API returns an array of teammates
            } catch (error) {
                console.error('Error fetching team mates:', error);
            }
        };

        fetchTeamMates();
    }, []); -->

    // Sort team_mates by percentage in descending order
    const sortedTeamMates = team_mates.sort((a, b) => b.percentage - a.percentage);

    // Assign medals or rank numbers based on the sorted order
    const assignMedalOrRank = (index) => {
        if (index === 0) return { type: 'medal', content: MedalOne };
        if (index === 1) return { type: 'medal', content: MedalTwo };
        if (index === 2) return { type: 'medal', content: MedalThree };
        return { type: 'rank', content: index + 1 }; // For ranks 4, 5, 6, etc.
    };

    return (
        <div className='team_mates'>
            <div className="team_mates-header">
                <div className="team_mates-header-text">
                    <img src={teammates} alt="teammates" />
                    <h2>Team Mates</h2>
                </div>
                <div className="team_mates-header-buttons">
                    <button type='button'>
                        <img src={refreshButton} alt="refreshButton" />
                    </button>
                    <button type='button'>
                        <img src={arrowButton} alt="arrowButton" />
                    </button>
                </div>
            </div>
            <div className="team_mates-mates_container">
                {sortedTeamMates.map((team_mate, index) => {
                    const medalOrRank = assignMedalOrRank(index);

                    return (
                        <div className="team_mates-mates_container-feild" key={index}>
                            <div className="team_mates-mates_container-feild-container">
                                <div className="team_mates-mates_container-feild-container-info">
                                    {medalOrRank.type === 'medal' ? (
                                        <img src={medalOrRank.content} alt="Medal" />
                                    ) : (
                                        <div className="rank-number">{medalOrRank.content}</div>
                                    )}
                                    <div className="team_mates-mates_container-feild-container-info-profile">
                                        <img src={image || team_mate.profile} alt="profile_image" className="pro_img" />
                                        <div className="team_mates-mates_container-feild-container-info-profile-name">
                                            {team_mate.label}
                                            <span className='teame_agency' style={{ color: team_mate.agency_color }}>
                                                {team_mate.agency}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="team_mates-mates_container-feild-container-percentage"
                                    style={{ backgroundColor: team_mate.background, color: team_mate.color }}
                                >
                                    {team_mate.percentage}%
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TeamMates;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './teammates.css';
import teammates from '../../../assets/images/teammates 1.svg';
import refreshButton from '../../../assets/images/refreshButton.svg';
import arrowButton from '../../../assets/images/arrowButton.svg';
import MedalOne from '../../../assets/images/first_1.svg';
import Avatar from '../../../assets/images/Avatar.svg';
import MedalTwo from '../../../assets/images/first_2.svg';
import MedalThree from '../../../assets/images/first- 3.svg';
import { useImage } from '../../../hook/EmailProvider';
import { useEmail } from '../../../hook/EmailProvider';

// Setting up axios instances for both APIs
const api1 = axios.create({
    baseURL: 'http://localhost:3400'
});

const api2 = axios.create({
    baseURL: 'http://localhost:3500'
});

// Define the mapping of agencies to their respective styles
const agencyStyles = {
    'DevSyro': {
        agency_color: "#fff",
        color: '#05CD99',
        background: '#05CD991A',
    },
    'Product Syro': {
        agency_color: "#23C1FF",
        color: '#EE5D50',
        background: '#EE5D501A',
    },
    'ArtSyro': {
        agency_color: "#A744FF",
        color: '#FFEB37',
        background: '#FFEB371A',
    },
    // Add more mappings as needed
};

const TeamMates = () => {
    const { image } = useImage();
    const {email} = useEmail();
    const [teamMates, setTeamMates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dashboardResponse, signupResponse] = await Promise.all([
                    api1.get('/DashboardAPI'),
                    api2.get('/SignUpAPI')
                ]);
    
                // Access the data directly as it's an array
                const dashboardData = dashboardResponse.data; 
                const signupData = signupResponse.data; 
    
                // Check and log the data
                console.log('Dashboard Data:', dashboardData);
                console.log('SignUp Data:', signupData);
    
                // Ensure both data sets are defined
                if (!dashboardData || !signupData) {
                    throw new Error('Data could not be fetched or is undefined');
                }
    
                const combinedData = signupData.map(signupItem => {
                    const matchingDashboardItem = dashboardData.find(
                        dashboardItem => dashboardItem.email === signupItem.email
                    );
                
                    const agencyStyle = agencyStyles[signupItem.selectedOption2] || {
                        agency_color: '#000',  // Default styles if agency not found
                        color: '#000',
                        background: '#0000001A',
                    };
                
                    const profileImage = signupItem.image && signupItem.image.startsWith('blob:')
                        ? signupItem.image
                        : Avatar; // Fallback to default avatar if image is not a valid blob URL
                
                    return {
                        name: signupItem.name,
                        profile: profileImage,
                        agency: signupItem.selectedOption2,
                        agency_color: agencyStyle.agency_color,
                        color: agencyStyle.color,
                        background: agencyStyle.background,
                        percentage: matchingDashboardItem ? matchingDashboardItem.percentage : 0,
                        email:email,
                    };
                });
                
    
                setTeamMates(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
    
        fetchData();
    }, []);
    
    

    // Sort teamMates by percentage in descending order
    const sortedTeamMates = teamMates.sort((a, b) => b.percentage - a.percentage);

    // Assign medals or rank numbers based on the sorted order
    const assignMedalOrRank = (index) => {
        if (index === 0) return { type: 'medal', content: MedalOne };
        if (index === 1) return { type: 'medal', content: MedalTwo };
        if (index === 2) return { type: 'medal', content: MedalThree };
        return { type: 'rank', content: index + 1 }; // For ranks 4, 5, 6, etc.
    };

    return (
        <div className='team_mates'>
            <div className="team_mates-header">
                <div className="team_mates-header-text">
                    <img src={teammates} alt="teammates" />
                    <h2>Team Mates</h2>
                </div>
                <div className="team_mates-header-buttons">
                    <button type='button'>
                        <img src={refreshButton} alt="refreshButton" />
                    </button>
                    <button type='button'>
                        <img src={arrowButton} alt="arrowButton" />
                    </button>
                </div>
            </div>
            <div className="team_mates-mates_container">
                {sortedTeamMates.map((teamMate, index) => {
                    const medalOrRank = assignMedalOrRank(index);

                    return (
                        <div className="team_mates-mates_container-feild" key={index}>
                            <div className="team_mates-mates_container-feild-container">
                                <div className="team_mates-mates_container-feild-container-info">
                                    {medalOrRank.type === 'medal' ? (
                                        <img src={medalOrRank.content} alt="Medal" />
                                    ) : (
                                        <div className="rank-number">{medalOrRank.content}</div>
                                    )}
                                    <div className="team_mates-mates_container-feild-container-info-profile">
                                        <img src={image || teamMate.profile} alt="profile_image" className="pro_img mate" />
                                        <div className="team_mates-mates_container-feild-container-info-profile-name">
                                            {teamMate.name}
                                            <span className='teame_agency' style={{ color: teamMate.agency_color }}>
                                                {teamMate.agency}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="team_mates-mates_container-feild-container-percentage"
                                    style={{ backgroundColor: teamMate.background, color: teamMate.color }}
                                >
                                    {teamMate.percentage}%
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TeamMates;

