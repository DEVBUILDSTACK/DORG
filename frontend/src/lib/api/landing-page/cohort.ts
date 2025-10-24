import type { CurrentCohortResponse } from "@/types/landing-page/cohort.types";
import type { CohoartApiResponse } from "@/types/landing-page/simulateCapital.types";

import { ApiGet } from "@/lib/api-helper";

export async function getCurrentCohort(): Promise<CohoartApiResponse<CurrentCohortResponse>> {
    const response = await ApiGet<CohoartApiResponse<CurrentCohortResponse>>(`/cohort-schedule/get-current-cohort-schedule`, {}, false);
    return response;
}
