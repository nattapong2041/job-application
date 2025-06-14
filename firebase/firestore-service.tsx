import {ApplicationStatus, Job, JobApplication} from "@/types";
import {db} from "@/firebase/firebase";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    Timestamp,
} from "@firebase/firestore";

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

export async function updateApplication(userId: string, applicationId: string, status: ApplicationStatus) {
    if (!userId || !applicationId) {
        return;
    }
    const docRef = doc(db, "users", userId, "applications", applicationId);

    // ดึงเอกสาร
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {}
    const data = docSnap.data();
    if (!data) {
        return;
    }


    const updatedApplication = {
        job: data.job,
        status: status,
        createdAt: data.createdAt,
        updatedAt: serverTimestamp()
    };

    await setDoc(docRef, updatedApplication);
}