module.exports = function registerHook({ filter }, { services, exceptions }) {
  const { ItemsService } = services;
  const { InvalidPayloadException } = exceptions;

  filter(
    "Subscribers.items.create",
    async (input, {}, { schema, accountability }) => {
      const subscribersService = new ItemsService("Subscribers", {
        schema,
        accountability,
      });
      const subscribers = await subscribersService.readByQuery({
        fields: ["*"],
      });
      const { phone, email, event } = input;
      const isFound = subscribers.some((subscriber) => {
        return (
          event === subscriber.event &&
          phone === subscriber.phone &&
          email === subscriber.email
        );
      });

      if (isFound) {
        throw new InvalidPayloadException("Пользователь уже зарегистрирован");
      }

      return input;
    }
  );
};
