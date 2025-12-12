import React from 'react';
import { motion } from 'framer-motion';

// Define the icons we want to float
// Using simple-icons CDN for high quality SVG logos
const FLOATING_ICONS = [
    { name: 'Databricks', url: 'https://cdn.simpleicons.org/databricks/FF3621', size: 60, top: '20%', left: '10%', duration: 4 },
    { name: 'Python', url: 'https://cdn.simpleicons.org/python/3776AB', size: 50, top: '60%', left: '5%', duration: 3.5 },
    { name: 'React', url: 'https://cdn.simpleicons.org/react/61DAFB', size: 65, top: '70%', left: '90%', duration: 4.5 },
    { name: 'Spark', url: 'https://cdn.simpleicons.org/apachespark/E25A1C', size: 55, top: '40%', left: '80%', duration: 4.2 },
    { name: 'Snowflake', url: 'https://cdn.simpleicons.org/snowflake/29B5E8', size: 45, top: '30%', left: '15%', duration: 3.8 },
    // New Additions

    { name: 'Delta Lake', url: 'https://www.vectorlogo.zone/logos/delta_io/delta_io-icon.svg', size: 55, top: '50%', left: '50%', duration: 4.0 }, // Using VectorLogo for Delta Lake
    { name: 'Git', url: 'https://cdn.simpleicons.org/git/F05032', size: 50, top: '80%', left: '20%', duration: 3.2 },
    { name: 'Azure Pipelines', url: 'https://cdn.simpleicons.org/azurepipelines/0078D4', size: 60, top: '55%', left: '85%', duration: 4.6 },
    { name: 'Azure DevOps', url: 'https://cdn.simpleicons.org/azuredevops/0078D4', size: 55, top: '25%', left: '65%', duration: 3.7 },
];

export const TechBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Gradient Overlay for "Water" feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-900/10 pointer-events-none" />

            {FLOATING_ICONS.map((icon, index) => (
                <motion.div
                    key={icon.name}
                    className="absolute opacity-40 hover:opacity-40 transition-opacity"
                    style={{
                        top: icon.top,
                        left: icon.left,
                        width: icon.size,
                        height: icon.size,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: icon.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                    }}
                >
                    <img
                        src={icon.url}
                        alt={icon.name}
                        className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                    />
                    {/* Reflection effect */}
                    <div
                        className="absolute top-full left-0 w-full h-full opacity-30 transform scale-y-[-1]"
                        style={{
                            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                        }}
                    >
                        <img
                            src={icon.url}
                            alt=""
                            className="w-full h-full object-contain blur-[2px]"
                        />
                    </div>
                </motion.div>
            ))}

            {/* Decorative Water Lines */}
            <svg className="absolute bottom-0 left-0 w-full h-48 opacity-10" preserveAspectRatio="none" viewBox="0 0 1440 320">
                <path fill="#0ea5e9" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,202.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>
    );
};
