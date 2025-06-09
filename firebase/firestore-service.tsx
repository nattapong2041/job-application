import {ApplicationStatus, Job, JobApplication} from "@/types";
import {auth, db} from "@/firebase/firebase";
import {addDoc, collection, getDocs, query, serverTimestamp, Timestamp} from "@firebase/firestore";

export async function createJob(userId: string, jobData: Job) {
    if (!userId) {
        return;
    }

    const newApplication = {
        job: jobData,
        status: ApplicationStatus.PENDING,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    };

    try {
        const userApplicationRef = collection(db, "users", userId, "applications");
        const docRef = await addDoc(userApplicationRef, newApplication);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getApplications(userId: string) {
    if (!userId) {
        return [];
    }

    const applications = await getDocs(query(collection(db, "users", userId, "applications")))
    return applications.docs.map((doc) => {
        const data = doc.data();
        try {
            return {
                id: doc.id,
                job: data.job,
                status: data.status,
                createdAt: (data.createdAt as Timestamp).toDate(),
                updatedAt: (data.updatedAt as Timestamp).toDate(),
            } as JobApplication;
        }catch (e) {
            console.error(e);
            return null;

        }
    }).filter(application => application !== null) as JobApplication[];
}