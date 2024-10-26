import React from 'react';
import { jwtDecode } from 'jwt-decode'; // Importar como un named export
import axios from 'axios';
import {
  //Button,
  Nav,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import { User, FileText, Star, Settings, Droplet } from 'react-feather';
import { useLocation } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import SidebarData from '../sidebardata/SidebarData';
//import Logo from '../../logo/Logo';
//import { ToggleMobileSidebar } from '../../../store/customizer/CustomizerSlice';
import NavItemContainer from './NavItemContainer';
import NavSubMenu from './NavSubMenu';

import user1 from '../../../assets/images/users/user4.jpg';
// Función para obtener el token de autorización
const getIdToken = () => {
  return sessionStorage.getItem('IdToken');
};

// Función para obtener el usuario a partir del token
const getUserFromToken = () => {
  const token = getIdToken();
  if (!token) return null;

  try {
    // Decodificamos el token para obtener los datos del usuario
    const decodedToken = jwtDecode(token);
    return decodedToken; // Aquí estarán los datos del usuario (como nombre, email, etc.)
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

// Ejemplo de uso
const user = getUserFromToken();
console.log("revisar user")
console.log(user); // Aquí deberías ver los datos del usuario (si están en el token)

// Configuración de axios con el token de autorización
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getIdToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agregamos el token en el encabezado de autorización
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const Sidebar = () => {
  const location = useLocation();
  const currentURL = location.pathname.split('/').slice(0, -1).join('/');

  //const [collapsed, setCollapsed] = useState(null);
  // const toggle = (index) => {
  //   setCollapsed(collapsed === index ? null : index);
  // };

  const activeBg = useSelector((state) => state.customizer.sidebarBg);
  const isFixed = useSelector((state) => state.customizer.isSidebarFixed);
  //const dispatch = useDispatch();

  return (
    <div className={`sidebarBox shadow bg-${activeBg} ${isFixed ? 'fixedSidebar' : ''}`}>
      <SimpleBar style={{ height: '100%', backgroundColor: '#447D12', color: 'white' }}>
        {/********Logo*******/}
        {/* <div className="d-flex p-3 align-items-center">
          <Logo />
          <Button
            close
            size="sm"
            className="ms-auto d-sm-block d-lg-none"
            onClick={() => dispatch(ToggleMobileSidebar())}
          />
        </div> */}
        {/********Sidebar Content*******/}
        <div className="py-4 text-center profile-area">
          <img src={user1} alt="John Deo" width={60} className="rounded-circle mb-2" />
          <UncontrolledDropdown>
            <DropdownToggle caret className="bg-transparent border-0">
              John Deo
            </DropdownToggle>
            <DropdownMenu className='w-100 border'>
              <DropdownItem className="px-4 py-3">
                <User size={20} className="text-muted" />
                &nbsp; My Profile
              </DropdownItem>
              <DropdownItem className="px-4 py-3">
                <FileText size={20} className="text-muted" />
                &nbsp; Edit Profile
              </DropdownItem>
              <DropdownItem className="px-4 py-3">
                <Star size={20} className="text-muted" />
                &nbsp; My Balance
              </DropdownItem>
              <DropdownItem className="px-4 py-3">
                <Droplet size={20} className="text-muted" />
                &nbsp; Customize
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem className="px-4 py-3">
                <Settings size={20} className="text-muted" />
                &nbsp; Settings
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div>
          <Nav vertical className={activeBg === 'white' ? '' : 'lightText'}>
            {SidebarData.map((navi) => {
              if (navi.caption) {
                return (
                  <div className="navCaption fw-bold text-uppercase mt-4" key={navi.caption}>
                    {navi.caption}
                  </div>
                );
              }
              if (navi.children) {
                return (
                  <NavSubMenu
                    key={navi.id}
                    icon={navi.icon}
                    title={navi.title}
                    items={navi.children}
                    suffix={navi.suffix}
                    suffixColor={navi.suffixColor}
                    // toggle={() => toggle(navi.id)}
                    // collapsed={collapsed === navi.id}
                    isUrl={currentURL === navi.href}
                  />
                );
              }
              return (
                <NavItemContainer
                  key={navi.id}
                  //toggle={() => toggle(navi.id)}
                  className={location.pathname === navi.href ? 'activeLink' : ''}
                  to={navi.href}
                  title={navi.title}
                  suffix={navi.suffix}
                  suffixColor={navi.suffixColor}
                  icon={navi.icon}
                />
              );
            })}
          </Nav>
        </div>
      </SimpleBar>
    </div>
  );
};

export default Sidebar;
