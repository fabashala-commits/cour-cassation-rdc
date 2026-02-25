import { Module } from '@nestjs/common';
import { JurisprudenceModule } from './jurisprudence/jurisprudence.module';
import { InstitutionModule } from './institution/institution.module';
import { ActualitesModule } from './actualites/actualites.module';
import { EspacePersoModule } from './espace-perso/espace-perso.module';

@Module({
  imports: [JurisprudenceModule, InstitutionModule, ActualitesModule, EspacePersoModule],
})
export class AppModule {}
