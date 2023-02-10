import { defineComponent } from 'vue'
import FormInput from '../FormInput'
import { formProps, itemsProps } from '../props'
import { capsule } from '../../props'
import { useFormDefaultValue, useFormValue } from '../_utils/useForm'
import { useFormRequired, useErrorMessage } from '../_utils/useFormValidator'

export default defineComponent({
  name: 'ZSelect',

  props: {
    ...formProps(),
    ...itemsProps(),
    capsule
  },

  setup(props, { attrs }) {
    const valueRef = useFormValue(props.formId, props.formKey)

    useFormDefaultValue({
      formId: props.formId, 
      formKey: props.formKey, 
      defaultValue: attrs.defaultValue, 
      valueRef
    })

    const required = useFormRequired(attrs.rules as any[])

    const errorMessageRef = useErrorMessage({
      formId: props.formId, 
      formKey: props.formKey, 
      valueRef, 
      rules: attrs.rules
    })

    return () => (
      <FormInput
        class="z-input-select"
        capsule={ props.capsule }
        direction={ props.direction }
        errorMessage={ errorMessageRef.value }
        label={ props.label }
        labelWidth={ props.labelWidth }
        required={ required }
      >
        <a-select 
          { ...attrs }
          v-model:value={ valueRef.value }
        >
          {
            props.items.map(item => (
              <a-select-option 
                value={ item[props.itemValue] }
              >
                { item[props.itemLabel] }
              </a-select-option>
            ))
          }
        </a-select>
      </FormInput>
    )
  }
}) 