
import "react-toastify/dist/ReactToastify.css"; 
import { FaEdit, FaSave, FaTimes, FaUser, FaCalendarAlt, FaPhone, FaVenusMars, FaUniversity, FaMapMarkerAlt, FaLink } from "react-icons/fa";
import { UserProfile } from "../../api_service/user";


interface AboutProps {
  profile: UserProfile | null
  isDarkMode: boolean; 
}

const OtherAbout: React.FC<AboutProps> = ({ profile,isDarkMode  }) => {
  
    return (
      <div className={`p-10 rounded-xl shadow-2xl max-w-4xl mx-auto transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {`Additional Information About @${profile?.username}`}
          </h2>       
        </div>
          <div className={`space-y-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {/* Username Section */}
            <div className="flex items-center space-x-4">
              <FaUser className={`text-gray-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              <div className="text-lg font-semibold">{profile?.username}</div>
            </div>
    
            {/* Details Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Age */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className={`text-gray-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  <h3 className="text-lg font-medium">Age</h3>
                </div>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{profile?.age || "N/A"}</p>
              </div>
    
              {/* Phone */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaPhone className={`text-gray-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  <h3 className="text-lg font-medium">Phone Number</h3>
                </div>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{profile?.phone || "N/A"}</p>
              </div>
    
              {/* Sex */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaVenusMars className={`text-gray-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  <h3 className="text-lg font-medium">Sex</h3>
                </div>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{profile?.sex || "N/A"}</p>
              </div>
    
              {/* Graduate School */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaUniversity className={`text-gray-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  <h3 className="text-lg font-medium">Graduate School</h3>
                </div>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{profile?.graduateSchool || "N/A"}</p>
              </div>
    
              {/* Address */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className={`text-gray-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  <h3 className="text-lg font-medium">Address</h3>
                </div>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{profile?.address || "N/A" }</p>
              </div>
    
              {/* Links */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaLink className={`text-gray-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  <h3 className="text-lg font-medium">Links</h3>
                </div>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{profile?.links || "N/A"}</p>
              </div>
            </div>
          </div>
      </div>
  
      
    );
  };
export default OtherAbout