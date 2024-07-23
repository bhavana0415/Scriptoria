import EditorPicks from "../../components/EditorPicks"
import Reviews from "../../components/Reviews"
import Slider from "../../components/Slider"
import { Welcome } from "../../components/Welcome"

export function Home() {
    return (
        <>
        <Welcome/>
        <Slider/>
        <EditorPicks/>
        <Reviews/>
        </>

    )
}