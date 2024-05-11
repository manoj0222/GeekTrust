
const APIURL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';



export const fetchMembersData = async () => {
    try {
        let response = await fetch(APIURL);
        response = await response.json();
        return response;
    }
    catch (error) {
        throw new Error('Failed to fetch data');
    }
}

