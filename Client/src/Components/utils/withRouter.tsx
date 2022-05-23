//
// import React from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

// eslint-disable-next-line
export default function withRouter(Component: any): any {
  function ComponentWithRouterProp(props: any): any {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}
