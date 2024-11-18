import { IResponseAddCandidateHTTP } from "../../infrastructure/interfaces/IResponseAddCandidateHTTP";
import { Candidate } from "../entities/Candidate";

export interface ICandidateRepository {
  add?(candidate: Candidate): Promise<IResponseAddCandidateHTTP>;
  get?(): Promise<Candidate[]>;
  delete?(id: string): Promise<void>;
}