import { Badge, type BadgeTone, Flex, Stack } from "@sanity/ui";
import { type TextInputProps, type TextOptions, useFormValue } from "sanity";

type CountedTextOptions = TextOptions & {
  maxLength?: number;
  minLength?: number;
};

interface CustomSanityDocument {
  _type?: string;
  name?: string;
  title?: string;
}

function CharacterCount(props: CountedTextOptions & { value?: string }) {
  if (!props.maxLength && !props.minLength) {
    return null;
  }

  const { value = "" } = props;

  const maxPercentage =
    props.maxLength && (value.length / props.maxLength) * 100;
  let tone: BadgeTone = "primary";
  if (maxPercentage && maxPercentage > 100) {
    tone = "critical";
  } else if (maxPercentage && maxPercentage > 75) {
    tone = "caution";
  }

  if (props.minLength && value.length < props.minLength) {
    tone = "caution";
  }
  return (
    <Badge mode="outline" tone={tone}>
      {value.length} / {props.maxLength}
    </Badge>
  );
}

export function InputWithCharacterCount(props: TextInputProps) {
  const document = useFormValue([]) as Partial<CustomSanityDocument>;

  const defaultTitle =
    props.id === "seo.title"
      ? ["organization", "person", "podcastShow"].includes(
          document?._type as string,
        )
        ? document?.name
        : document?.title
      : undefined;

  props.elementProps.placeholder = defaultTitle;

  return (
    <Stack space={2}>
      {props.renderDefault(props)}
      <Flex justify="flex-end">
        <CharacterCount
          value={props.value}
          {...((props.schemaType.options || {}) as CountedTextOptions)}
        />
      </Flex>
    </Stack>
  );
}
