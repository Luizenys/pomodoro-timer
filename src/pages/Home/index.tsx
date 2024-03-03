import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, Separator } from "./styles";


export function Home() {
    return (
        <HomeContainer>
            <form>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <input id="task" type="text"></input>    

                    <label htmlFor="minutesAmount">Vou trabalhar em</label>
                    <input id="minutesAmount" type="number"></input>  

                    <span>minutos.</span>  
                </FormContainer>
                
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <button type="submit">
                    <Play size={24} />
                    Começar
                </button>
            </form>
        </HomeContainer>
   )
}