import { useOutlet, Navigate, useLoaderData } from "react-router-dom";
import { ConfigProvider } from "antd";

export const LoginLayout = () => {
  // console.log("经过LoginLayout")
  const outlet = useOutlet();
  const { userPromise } = useLoaderData();
  
  if (userPromise) {
    return <Navigate to="/Questionnaire/" replace />;
  }

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#01bd78', borderRadius: 2 },
      }}
    >
      {outlet}
    </ConfigProvider>
  );
};