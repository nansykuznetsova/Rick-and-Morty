import {Layout} from "../layout/Layout.tsx";
import {Logo} from "../components/Logo/Logo.tsx";

import "./CharacterList.css"
import {Loader} from "../components/Loader/Loader.tsx";

export const CharacterList: React.FunctionComponent = () => {
    return (
        <Layout>
            <div className="character-list">
                <Logo />
                <Loader
                    text = "Loading characters..."
                    size = "large"
                />
            </div>
        </Layout>
    )
}