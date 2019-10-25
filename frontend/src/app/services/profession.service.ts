import { Injectable } from '@angular/core';
import { URL_PREFIX } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Profession } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  constructor(private http: HttpClient, private translateService: TranslateService) { }

  // uses API call
  getAllProfessions = async (): Promise<Profession[]> => {
    const professionArray = await this.getProfessions();
    const professions = [];
    professionArray.map((profession: any) => {
      const currentLang = this.getCurrentLanguage(this.translateService);
      // creates a name like 'nameEn' or 'nameHu'
      const professionLanguage = `name${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`;
      professions.push({ id: profession.id, name: profession[professionLanguage] });
    });
    return professions;
  }

  // calls API
  private async getProfessions() {
    return await this.http.get<any>(`${URL_PREFIX}/professions`).toPromise();
  }

  private getCurrentLanguage(translateService: TranslateService) {
    return translateService.currentLang ? translateService.currentLang : translateService.defaultLang;
  }

  /**
   * @deprecated
   * @description gets data from i18n files
   */
  private addProfessionsToArray() {
    const professions = [];
    this.translateService.get('registration.professions').subscribe(
      (professionArray: string[]) => {
        professionArray.map((profession: string) => {
          professions.push(profession);
        });
      }
    );
  }

  // getProfessionsByLanguage(currentLanguage: string): Observable<any> {
  //   return this.http.post<any>(`${URL_PREFIX}/customers/professions`, { language: currentLanguage });
  // }

}
