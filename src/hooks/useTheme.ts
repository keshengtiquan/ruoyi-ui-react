import { theme } from "antd";

function useTheme () {
  const {useToken} = theme
  const {token} = useToken()
  return token
}

export default useTheme;
