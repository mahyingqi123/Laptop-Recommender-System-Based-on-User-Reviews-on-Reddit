from pyabsa import AspectTermExtraction as ATEPC
from pyabsa import DatasetItem
import warnings
from pyabsa import ModelSaveOption, DeviceTypeOption
config = (
    ATEPC.ATEPCConfigManager.get_atepc_config_english()
)
config.model = ATEPC.ATEPCModelList.BERT_BASE_ATEPC  # improved version of LCF-ATEPC
dataset = ATEPC.ATEPCDatasetList.Laptop14
warnings.filterwarnings("ignore")

config.batch_size = 16
config.patience = 2
config.log_step = -1
config.seed = [1, 2, 3]
config.verbose = False  # If verbose == True, PyABSA will output the model strcture and seversal processed data examples
config.notice = (
    "This is an model for aspect term extraction"  # for memos usage
)

trainer = ATEPC.ATEPCTrainer(
    config=config,
    dataset=dataset,
    auto_device=DeviceTypeOption.AUTO,  # use cuda if available
    checkpoint_save_mode=ModelSaveOption.SAVE_MODEL_STATE_DICT,  # save state dict only instead of the whole model
    load_aug=False,  # there are some augmentation dataset for integrated datasets, you use them by setting load_aug=True to improve performance
    path_to_save="ate_model_1"
)