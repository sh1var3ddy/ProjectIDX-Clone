import { Button , Row, Col, Flex} from "antd";
import { useCreateProject } from "../../hooks/apis/mutations/useCreateProject.js"
import { useNavigate } from 'react-router-dom'



export const CreateProject = () =>{

    const navigate = useNavigate();
    const {createProjectMutation, isPending } = useCreateProject();


    async function handleCreateProject(){
        console.log("Going to trigger the api");
        try{
            const response = await createProjectMutation();
            console.log("Now we should redirect to project page");
            navigate(`/project/${response.data}`);
        }catch(error){
            console.log("Error creating project", error)
        }
    }

    return (
        <Row>
            <Col span={24}>
                <Flex justify="center" allign="center">
                    <Button
                        onClick={handleCreateProject}
                    >
                        Create Playground
                    </Button>
                </Flex>
            </Col>
        </Row>
    )
}