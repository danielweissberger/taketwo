import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import * as R from 'ramda';

const PathSatisfied = (pathname) => (targetPath) =>
    pathname.includes(targetPath);

const sanitizePath = (path) => path.replace(/\/\//g, "/");

const useOpenModal = () => {
	const history = useHistory();
    const {path} = useRouteMatch();
    const pathSatisfied = PathSatisfied(path)

	const openModal = R.unless(
		pathSatisfied,
		() => history.push(sanitizePath(`${path}/permissions`)),
	);
	return {openModal}
}

export default useOpenModal