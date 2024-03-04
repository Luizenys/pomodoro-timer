import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form';
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";


export function Home() {
    const { register, handleSubmit, watch } = useForm()

    const task = watch('task')
    const isSubmitDisabled = !task

    function handleCreateNewCycle(data: any) {

    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="" >
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput id="task" type="text" placeholder="Dê um nome para o seu projeto" list="task-suggestions" {...register('task')} />   

                    <datalist id="task-suggestions">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                        <option value="Banana" />
                    </datalist>

                    <label htmlFor="minutesAmount">Vou trabalhar em</label>
                    <MinutesAmountInput id="minutesAmount" type="number" placeholder="00" step={5} min={5} max={60} {...register('minutesAmount', {valueAsNumber: true})}  />

                    <span>minutos.</span>  
                </FormContainer>
                
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
   )
}