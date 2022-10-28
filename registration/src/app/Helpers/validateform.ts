import { FormControl, FormGroup } from "@angular/forms";

export default class ValidateForm{
  static validateAllFormField(fg:FormGroup){
    Object.keys(fg.controls).forEach(fields =>{
      const control = fg.get(fields);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf: true})
      }else if(control instanceof FormGroup){
        this.validateAllFormField(control)
      }
    })
  }
}
