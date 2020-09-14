# React `useMimicPassword` hook

Password-mask hook for ReactJS for input components to mimic mobile behavior and improve the accuracy of user input.

## Features

- Mask input per-type
- Mask input after delay
- TypeScript support
- Tested and ready for commercial use

### `persymbol` mode

![Persymbol mode](docs/persymbol-demo.gif?raw=true "Persymbol mode")

### `delayed` mode

![Delayed mode](docs/delayed-demo.gif?raw=true "Delayed mode")

## Installation

With NPM:

```
npm install react-mimic-password-hook
```

With yarn:

```
yarn add react-mimic-password-hook
```

## Quickstart

```jsx
import React from 'react';
import { useMimicPassword } from 'react-mimic-password-hook';

function App() {
  const handleChange = React.useCallback((value, event) => { console.log(value) }, [])

  const [value, presentation, onChange] = useMimicPassword({
    // All these parameters are optional
    mask: '•',
    delay: 1000,
    mode: 'delayed',
    handleChange
  })

  return (
    <input value={presentation} onChange={onChange} />
  )
}
```

## Options

| Name           | Type     | Default     | Description
|----------------|----------|-------------|--------------------------------
| `mask`         | string   |  `•`        | Symbol to mask the original input.
| `delay`        | number   | 1000        | Time in miliseconds before text is masked.
| `mode`         | string   | `delayed`   | `delayed` or `persymbol`
| `handleChange` | function | *undefined* | Callback function for `onChange` that accepts two arguments. E. g. `(value, event) => void`

### API

`useMimicPassword` returns an array with 3 members:

- Original input value.
- Masked presentation value.
- `onChange` callback that return next value.

## Faq

### How to correctly submit a value via form?

For ajax forms you should use `value` returned from the hook.

To put value directly to the form use the following approach:

```js
<input value={presentation} onChange={onChange} type="text" />
<input type="hidden" name="form-input-server-name" value={value} />
```

### How to use hook with useForm?

Please see the example:

```jsx
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMimicPassword } from 'react-mimic-password-hook'

function App() {
  const [password, passwordPresentation, onChangeMimicPassword] = useMimicPassword()

  const { control, errors, handleSubmit } = useForm({
    defaultValues: {
      password: ''
    }
  })

  const onSubmit = React.useCallback((data) => {
    // Send form...
  }, [])

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required' }}
        render={({ onChange, onBlur, value: _, name }) => (
          <>
            <input
              value={passwordPresentation}
              onChange={(e) => {
                const nextValue = onChangeMimicPassword(e)
                onChange(nextValue)
              }}
              onBlur={onBlur}
            />
            <input type="hidden" value={password} name={name} />
          </>
        )}
      />
      <p style={{ color: 'red' }}>{errors.password?.message}</p>
    </form>
  )
}
```

## Contributing

Feel free to submit issues and raise PRs. Please keep code and commits consistent with present codebase.

Please also don't forget to update tests accordingly.
For local test run you might need to install React as dependency rather than peer dependency. Please don't commit such change.

## License

This project is licensed under the terms of the MIT license.
