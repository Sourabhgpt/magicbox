import CreateQuestionAnswer from "../components/CreateQuestionAnswer/CreateQuestionAnswer";

const getServerSideProps = async () => {
    return{
        redirect:{
            destination: "/edu-ai-skills/",
            permanent:true
        }
    }
}

export default CreateQuestionAnswer;
