import SplashCursor from './Aurora';
import PropTypes from 'prop-types';

export default function FluidBackground({ children, className = "" }) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 -z-50">  
        <SplashCursor 
          SIM_RESOLUTION={32}
          DYE_RESOLUTION={256}
          DENSITY_DISSIPATION={4}
          VELOCITY_DISSIPATION={2.5}
          SPLAT_RADIUS={0.25}
          SPLAT_FORCE={3000}
          COLOR_UPDATE_SPEED={6}
          BACK_COLOR={{ r: 0.02, g: 0.05, b: 0.1 }}
          TRANSPARENT={true}
          CURL={10}
          PRESSURE={0.1}
          PRESSURE_ITERATIONS={20}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-transparent to-green-900/10 backdrop-blur-[1px] -z-40"></div>
      <div className="w-full">{children}</div>
    </div>
  );
}

FluidBackground.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}; 