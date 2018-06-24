import { should } from "fuse-test-runner";
import { Codon } from "../lib/symbols/codon";
import { RNA } from "../lib/symbols/rna";

export class CodonTest {
  public "Codon.getCodonChain should return a matching codon string"() {
    const cod1 = new Codon(RNA.U, RNA.A, RNA.G);
    const cod2 = new Codon(RNA.U, RNA.U, RNA.A);
    const cod3 = new Codon(RNA.G, RNA.C, RNA.C);
    const codArr = [cod1, cod2, cod3];
    const rnaSeq = Codon.getCodonChain(codArr);
    const expectedSeq = "STOP-Leu-Ala";
    should(rnaSeq).equal(expectedSeq);
  }

  public "codon.setCodon should set a new codon"() {
    const cod1 = new Codon(RNA.G, RNA.C, RNA.C);
    const cod1AA = Codon.matchCodon(cod1);
    const expectedCod1 = "Ala";
    should(cod1AA).equal(expectedCod1);
    cod1.setCodon(RNA.U, RNA.U, RNA.A);
    const cod1AA2 = Codon.matchCodon(cod1);
    const expectedCod2 = "Leu";
    should(cod1AA2).equal(expectedCod2);
  }

  public "codon.matchCodon should return a matching AA"() {
    const cod1 = new Codon(RNA.G, RNA.C, RNA.C);
    const cod1AA = Codon.matchCodon(cod1);
    const expectedCod1 = "Ala";
    should(cod1AA).equal(expectedCod1);
  }
}
