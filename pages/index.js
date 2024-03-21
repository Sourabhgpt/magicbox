export const getServerSideProps = async () => {
    return{
        redirect:{
            destination: "/edu-ai-skills",
            permanent:true
        }
    }
}
