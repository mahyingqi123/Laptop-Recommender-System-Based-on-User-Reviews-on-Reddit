from pyabsa import AspectTermExtraction as ATEPC
from pyabsa import DatasetItem
import warnings
from pyabsa import ModelSaveOption, DeviceTypeOption


aspect_extractor = ATEPC.AspectExtractor(checkpoint="ate_model_1/bert_base_atepc_Laptop14_cdw_apcacc_78.68_apcf1_73.82_atef1_78.26", auto_device=DeviceTypeOption.AUTO)

result = aspect_extractor.predict(
        text="The screen is good, but the battery life is short.",
        print_result=True,
        ignore_error=True,  # ignore an invalid example, if it is False, invalid examples will raise Exceptions
        pred_sentiment=False,  # predict the sentiment polarity of the aspect term
        eval_batch_size=32,
    )

print(result)

