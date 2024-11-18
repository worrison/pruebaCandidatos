import { Candidate } from "../../../domain/entities/Candidate";
import { ICandidateRepository } from "../../../domain/repositories/ICandidateRepository";
// import { IResponseGetCandidateHTTP } from "../../../infrastructure/interfaces/IResponseAddCandidateHTTP";

export class UseGetCandidate {
  private candidateRepository: ICandidateRepository;

  constructor(candidateRepository: ICandidateRepository) {
    this.candidateRepository = candidateRepository;
  }

  async execute(): Promise<any> {
    if (this.candidateRepository.get) {
      const response = await this.candidateRepository.get();
      return response;
    } else {
      throw new Error("Add method is not defined on candidate repository");
    }
  }
}