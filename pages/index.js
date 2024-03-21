import CreateQuestionAnswer from "../components/CreateQuestionAnswer/CreateQuestionAnswer";
export default CreateQuestionAnswer;
export const getServerSideProps = async () => {
    return{
        redirect:{
            destination: "/edu-ai-skills/",
            permanent:true
        }
    }
}