import {Layout} from "../layout/Layout.tsx";
import { Link } from "react-router-dom";
import {ArrowBack} from "../assets/icons/ArrowBack.tsx";

import "./CharacterDetails.css";
import {Loader} from "../components/Loader/Loader.tsx";

export const CharacterDetails: React.FunctionComponent = () => {
    // const { id } = useParams();

    return (
        <Layout>
            <div className="character-details">
                <Link
                    to="/"
                    className="go-back-character-details"
                    aria-label="назад в меню"
                >
                    <ArrowBack />
                    GO BACK
                </Link>
                <Loader
                    text = "Loading character card..."
                    size = "large"
                />
            </div>

        </Layout>
    )
}